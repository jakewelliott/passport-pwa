using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Services;

using Microsoft.EntityFrameworkCore;

namespace DigitalPassportBackend.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(
        this IServiceCollection services)
    {
        services.AddScoped<ILocationsService, LocationsService>();

        return services;
    }

    public static IServiceCollection AddGlobalErrorHandling(
        this IServiceCollection services)
    {
        services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions["traceId"] = context.HttpContext.TraceIdentifier;
            };
        });

        return services;
    }

    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration,
        bool isDevelopment)
    {
        services.AddScoped<IBucketListItemRepository, BucketListItemRepository>();
        services.AddScoped<ICollectedStampRepository, CollectedStampRepository>();
        services.AddScoped<ICompletedBucketListItemRepository, CompletedBucketListItemRepository>();
        services.AddScoped<ILocationsRepository, LocationsRepository>();
        services.AddScoped<IParkAddressRepository, ParkAddressRepository>();
        services.AddScoped<IParkIconRepository, ParkIconRepository>();
        services.AddScoped<IParkPhotoRepository, ParkPhotoRepository>();
        services.AddScoped<IParkVisitRepository, ParkVisitRepository>();
        services.AddScoped<IPrivateNoteRepository, PrivateNoteRepository>();
        services.AddScoped<ITrailIconRepository, TrailIconRepository>();
        services.AddScoped<ITrailRepository, TrailRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        var envAddendum = isDevelopment ? "DEV_" : "";
        var connectionString = $"host={configuration[$"DB_{envAddendum}HOST"]};" +
                               $"port=3306;" +
                               $"user id=root;" +
                               $"password={configuration[$"DB_{envAddendum}PASSWORD"]};" +
                               $"database={configuration[$"DB_{envAddendum}DATABASE"]};";
        services.AddDbContext<DigitalPassportDbContext>(options =>
            options.UseMySql(
                connectionString,
                new MariaDbServerVersion(new Version(11, 6, 2)),
                options => options.UseNetTopologySuite()
                )
            );

        return services;
    }
}
