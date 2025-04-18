using System.Diagnostics.CodeAnalysis;
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

[ExcludeFromCodeCoverage]
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(
        this IServiceCollection services)
    {
        services.AddScoped<ILocationsService, LocationsService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IActivityService, ActivityService>();

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

    public static IServiceCollection AddOrigins(
        this IServiceCollection services,
        IConfiguration configuration,
        string corsPolicyName)
    {
        services.AddCors(options => {
            options.AddPolicy(corsPolicyName, builder => {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        return services;
    }

    public static IServiceCollection AddSecurity(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddSingleton<ITokenProvider, TokenProvider>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
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
        services.AddScoped<IBucketListItemRepository, BucketListItemRepository>();
        services.AddScoped<ICollectedStampRepository, CollectedStampRepository>();
        services.AddScoped<ICompletedBucketListItemRepository, CompletedBucketListItemRepository>();
        services.AddScoped<ILocationsRepository, LocationsRepository>();
        services.AddScoped<IParkAddressRepository, ParkAddressRepository>();
        services.AddScoped<IParkIconRepository, ParkIconRepository>();
        services.AddScoped<IParkPhotoRepository, ParkPhotoRepository>();
        services.AddScoped<IParkVisitRepository, ParkVisitRepository>();
        services.AddScoped<IFavoriteParkRepository, FavoriteParkRepository>();
        services.AddScoped<IPrivateNoteRepository, PrivateNoteRepository>();
        services.AddScoped<ITrailIconRepository, TrailIconRepository>();
        services.AddScoped<ITrailRepository, TrailRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IFavoriteParkRepository, FavoriteParkRepository>();

        var envAddendum = isDevelopment ? "DEV_" : "";
        var connectionString = $"host={configuration[$"DB_{envAddendum}HOST"]};" +
                               $"port={configuration[$"DB_{envAddendum}PORT"]};" +
                               $"user id=root;" +
                               $"password={configuration[$"DB_{envAddendum}PASSWORD"]};" +
                               $"database={configuration[$"DB_{envAddendum}DATABASE"]};";
        services.AddDbContext<DigitalPassportDbContext>((serviceProvider, options) =>
{
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString),
        options => options.UseNetTopologySuite()
    );
});

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
