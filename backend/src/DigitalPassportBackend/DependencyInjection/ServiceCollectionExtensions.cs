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
        services.AddScoped<ProductService>();  
        
        

        return services;
    }

    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<ProductsRepository>();

        var connectionString = $"host={configuration["DB_HOST"]};" +
                               $"port=3306;" +
                               $"user id=root;" +
                               $"password={configuration["DB_PASSWORD"]};" +
                               $"database={configuration["DB_PROD_DATABASE"]};";
        // var connectionString = "host=db;port=3306;user id=root;password=strong_password;database=test;";
        Console.WriteLine(connectionString);
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
