export const getIconTooltip = (iconName: string) => {
    // first get rid of any non-alphanumeric characters
    const cleaned = iconName.replace(/[^a-zA-Z0-9]/g, '');

    // if: starts with 1 capital letter, rest are lowercase letters
    // then: return as it
    // ex: Hiking -> Hiking
    if (cleaned.match(/^[A-Z][a-z]*$/)) return cleaned;

    // now put a space between any capital letters that are not right next to each other
    // ex: HorseTrailerParking -> Horse Trailer Parking
    const spaced = cleaned.replace(/([A-Z])/g, ' $1').trim();

    // now if there's any

    return cleaned;
};
