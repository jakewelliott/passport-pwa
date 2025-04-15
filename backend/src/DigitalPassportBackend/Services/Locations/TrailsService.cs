using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Errors;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services.Locations;

public class TrailsService
{
    private readonly ITrailRepository _trailRepository;
    private readonly ITrailIconRepository _trailIconRepository;

    public TrailsService(
        ITrailRepository trailRepository,
        ITrailIconRepository trailIconRepository)
    {
        _trailRepository = trailRepository;
        _trailIconRepository = trailIconRepository;
    }

    public List<Trail> GetAllTrails()
    {
        return _trailRepository.GetAll();
    }
    
    public List<TrailIcon> GetTrailIcons(int trailId)
    {
        return _trailIconRepository.GetByTrailId(trailId);
    }

    public void CreateTrail(Trail trail, List<TrailIcon> icons)
    {
        if (_trailRepository.GetByName(trail.trailName) is null)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trailRepository.Create(trail);
        icons.ForEach(i => _trailIconRepository.Create(i));
    }

    public void UpdateTrail(Trail trail, List<TrailIcon> icons)
    {
        var t = _trailRepository.GetByName(trail.trailName);
        if (t is not null && t.id != trail.id)
        {
            throw new ServiceException(409, $"Trail with name '{trail.trailName}' already exists");
        }

        _trailRepository.Update(trail);
        Helpers.SetValues(_trailIconRepository.GetByTrailId(trail.id), icons, _trailIconRepository);
    }

    public void DeleteTrail(int id)
    {
        _trailIconRepository.GetByTrailId(id).ForEach(i => _trailIconRepository.Delete(i.id));
        _trailRepository.Delete(id);
    }
}