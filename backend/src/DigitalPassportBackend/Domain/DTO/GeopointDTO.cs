using NetTopologySuite.Geometries;

public record GeopointDTO(
    double longitude,
    double latitude,
    double inaccuracyRadius
)
{
    public static GeopointDTO FromDomain(Point point, double inaccuracyRadius)
    {
        return new(
            point.X,
            point.Y,
            inaccuracyRadius
        );
    }

    public Point ToDomain()
    {
        return new(longitude, latitude);
    }
}