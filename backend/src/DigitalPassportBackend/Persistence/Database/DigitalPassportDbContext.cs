using System.Diagnostics.CodeAnalysis;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Security;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.Persistence.Database;

[ExcludeFromCodeCoverage]
public class DigitalPassportDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public DigitalPassportDbContext(DbContextOptions<DigitalPassportDbContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }



    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Model.GetEntityTypes()
            .SelectMany(e => e.GetProperties())
            .Where(p => p.ClrType == typeof(string))
            .ToList()
            .ForEach(p =>
            {
                p.SetColumnType("varchar(255)");
                p.SetMaxLength(255);
            });

        var hashedAdminPassword = new PasswordHasher().HashPassword(_configuration["ADMIN_PASS"]!);

        modelBuilder.Entity<User>().HasData(new User
        {
            id = 1,
            username = "superAdmin",
            password = hashedAdminPassword,
            role = UserRole.admin,
            createdAt = DateTime.UtcNow,
        });
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder
            .Properties<Enum>()
            .HaveConversion<string>()
            .HaveColumnType("varchar(255)");
    }


    public DbSet<BucketListItem> BucketListItems { get; set; }
    public DbSet<CollectedStamp> CollectedStamps { get; set; }
    public DbSet<CompletedBucketListItem> CompletedBucketListItems { get; set; }
    public DbSet<Park> Parks { get; set; }
    public DbSet<ParkAddress> ParkAddresses { get; set; }
    public DbSet<ParkIcon> ParkIcons { get; set; }
    public DbSet<ParkPhoto> ParkPhotos { get; set; }
    public DbSet<ParkVisit> ParkVisits { get; set; }
    public DbSet<PrivateNote> PrivateNotes { get; set; }
    public DbSet<Trail> Trails { get; set; }
    public DbSet<TrailIcon> TrailIcons { get; set; }
    public DbSet<User> Users { get; set; }
}