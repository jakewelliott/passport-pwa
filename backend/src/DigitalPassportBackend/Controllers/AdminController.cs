using DigitalPassportBackend.Services;

using Microsoft.AspNetCore.Mvc;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api")]
public class AdminController(IAdminService adminService) : ControllerBase
{
    private readonly IAdminService _adminService = adminService;
}