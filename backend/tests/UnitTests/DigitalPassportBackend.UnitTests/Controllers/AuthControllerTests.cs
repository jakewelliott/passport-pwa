using System;
using System.Security.Claims;
using DigitalPassportBackend.Controllers;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;
using DigitalPassportBackend.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace DigitalPassportBackend.UnitTests.Controllers
{
    public class AuthControllerTests
    {
        private readonly Mock<IAuthService> _mockAuthService;
        private readonly AuthController _controller;

        public AuthControllerTests()
        {
            _mockAuthService = new Mock<IAuthService>();
            _controller = new AuthController(_mockAuthService.Object);
        }

        [Fact]
        public void Get_AdminRoleValidUserId_ReturnsOkResult()
        {
            // Arrange
            SetupUser(1, "admin");
            var user = new User { id = 2, username = "user2", password = "password", role = UserRole.visitor };
            _mockAuthService.Setup(s => s.GetUserById(2)).Returns(user);

            // Act
            var result = _controller.Get(2);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedUser = Assert.IsType<UserDto>(okResult.Value);
            Assert.Equal(2, returnedUser.id);
        }

        [Fact]
        public void Get_AdminRoleInvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            SetupUser(1, "admin");
            _mockAuthService.Setup(s => s.GetUserById(0)).Throws(new NotFoundException("User not found"));

            // Act & Assert
            Assert.Throws<NotFoundException>(() => _controller.Get(0));
        }

        [Fact]
        public void Get_AdminRoleOwnUserId_ReturnsOkResult()
        {
            // Arrange
            SetupUser(1, "admin");
            var user = new User { id = 1, username = "admin", password = "password", role = UserRole.admin };
            _mockAuthService.Setup(s => s.GetUserById(1)).Returns(user);

            // Act
            var result = _controller.Get(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedUser = Assert.IsType<UserDto>(okResult.Value);
            Assert.Equal(1, returnedUser.id);
        }

        [Fact]
        public void Register_NullLoginDto_ThrowsNullReferenceException()
        {
            // Act & Assert
            Assert.Throws<NullReferenceException>(() => _controller.Register(null!));
        }

        [Fact]
        public void Register_NullUsername_ThrowsArgumentNullException()
        {
            // Arrange
            var dto = new LoginDto { username = null!, password = "password" };
            _mockAuthService.Setup(s => s.RegisterUser(It.IsAny<User>())).Returns("token");

            // Act & Assert
            Assert.IsType<OkObjectResult>(_controller.Register(dto));
        }

        [Fact]
        public void Register_NullPassword_ThrowsArgumentNullException()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = null! };
            _mockAuthService.Setup(s => s.RegisterUser(It.IsAny<User>())).Returns("token");

            // Act & Assert
            Assert.IsType<OkObjectResult>(_controller.Register(dto));
        }

        [Fact]
        public void Register_EmptyStringUsername_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "", password = "password" };
            _mockAuthService.Setup(s => s.RegisterUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Register(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Register_EmptyStringPassword_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = "" };
            _mockAuthService.Setup(s => s.RegisterUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Register(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Register_ValidUserDetails_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = "password" };
            _mockAuthService.Setup(s => s.RegisterUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Register(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Login_NullLoginDto_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<NullReferenceException>(() => _controller.Login(null!));
        }

        [Fact]
        public void Login_NullUsername_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = null!, password = "password" };
            _mockAuthService.Setup(s => s.LoginUser(It.IsAny<User>())).Returns("token");

            // Act & Assert
            Assert.IsType<OkObjectResult>(_controller.Login(dto));
        }

        [Fact]
        public void Login_NullPassword_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = null! };
            _mockAuthService.Setup(s => s.LoginUser(It.IsAny<User>())).Returns("token");

            // Act & Assert
            Assert.IsType<OkObjectResult>(_controller.Login(dto));
        }

        [Fact]
        public void Login_EmptyStringUsername_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "", password = "password" };
            _mockAuthService.Setup(s => s.LoginUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Login(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Login_EmptyStringPassword_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = "" };
            _mockAuthService.Setup(s => s.LoginUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Login(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Login_ValidUserDetails_ReturnsOkResult()
        {
            // Arrange
            var dto = new LoginDto { username = "heyy", password = "password" };
            _mockAuthService.Setup(s => s.LoginUser(It.IsAny<User>())).Returns("token");

            // Act
            var result = _controller.Login(dto);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        private void SetupUser(int userId, string role)
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, role)
            }));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };
        }
    }
}
