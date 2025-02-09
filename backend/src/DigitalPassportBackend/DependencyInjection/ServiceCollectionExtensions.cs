using System.Text;

using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.Persistence.Repository;
using DigitalPassportBackend.Security;
using DigitalPassportBackend.Secutiry;
using DigitalPassportBackend.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace DigitalPassportBackend.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(
        this IServiceCollection services)
    {
        services.AddScoped<ILocationsService, LocationsService>();
        services.AddScoped<IAuthService, AuthService>();

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

    public static IServiceCollection AddSecurity(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddSingleton<TokenProvider>();
        services.AddSingleton<PasswordHasher>();
        services.AddAuthorization();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(o =>
            {
                o.RequireHttpsMetadata = true;
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["API_TOKEN_KEY"]!)),
                    ValidIssuer = configuration["API_TOKEN_ISSUER"],
                    ValidAudience = configuration["API_TOKEN_AUDIENCE"],
                    ClockSkew = TimeSpan.Zero
                };
            });
        return services;
    }

    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration,
        bool isDevelopment)
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

        var envAddendum = isDevelopment ? "DEV_" : "";
        var connectionString = $"host={configuration[$"DB_{envAddendum}HOST"]};" +
                               $"port=3306;" +
                               $"user id=root;" +
                               $"password={configuration[$"DB_{envAddendum}PASSWORD"]};" +
                               $"database={configuration[$"DB_{envAddendum}DATABASE"]};";
        services.AddDbContext<DigitalPassportDbContext>(options =>
            options.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString),
                options => options.UseNetTopologySuite()
                )
            );

        return services;
    }

    public static IServiceCollection AddSwaggerGenWithAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(o =>
        {
            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "JWT Authentication",
                Description = "Enter your JWT token in this field",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                BearerFormat = "JWT"
            };

            o.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);

            var securityRequirement = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        }
                    },
                    []
                }
            };

            o.AddSecurityRequirement(securityRequirement);
        });

        return services;
    }
}
