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
        services.AddScoped<LocationsService>();  
        
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
        IConfiguration configuration)
    {
        services.AddScoped<BucketListItemRepository>();
        services.AddScoped<CollectedStampRepository>();
        services.AddScoped<CompletedBucketListItemRepository>();
        services.AddScoped<LocationsRepository>();
        services.AddScoped<ParkAddressRepository>();
        services.AddScoped<ParkIconRepository>();
        services.AddScoped<ParkPhotoRepository>();
        services.AddScoped<ParkVisitRepository>();
        services.AddScoped<PrivateNoteRepository>();
        services.AddScoped<TrailIconRepository>();
        services.AddScoped<TrailRepository>();
        services.AddScoped<UserRepository>();

        var connectionString = $"host={configuration["DB_HOST"]};" +
                               $"port=3306;" +
                               $"user id=root;" +
                               $"password={configuration["DB_PASSWORD"]};" +
                               $"database={configuration["DB_PROD_DATABASE"]};";
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
