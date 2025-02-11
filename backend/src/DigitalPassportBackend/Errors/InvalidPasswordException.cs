namespace DigitalPassportBackend.Errors;
public class InvalidPasswordException(string message) 
    : ServiceException(StatusCodes.Status422UnprocessableEntity, message)
{
}