import { useGetAllNotes } from "@/hooks/queries/useNotes";
import { useParks } from "@/hooks/queries/useParks";
import { useParkNotesStore } from "@/hooks/store/useParkNotesStore";
import { a11yOnClick } from "@/lib/a11y";
import dateHelper from "@/lib/date-helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListRow from "../../components/list-row";

export const MyNotes = () => {
  const navigate = useNavigate();
  const { getNoteContent, getKeys, getUpdatedAt, clearNotes, setNote } =
    useParkNotesStore();
  const { data: parks } = useParks();
  const { data: remoteNotes, refetch } = useGetAllNotes();

  useEffect(() => {
    refetch();
    clearNotes();
    if (remoteNotes) {
      remoteNotes.forEach((note) => {
        setNote(note.parkAbbreviation, note.note, new Date(note.updatedAt).getTime());
      });
    }
  }, [remoteNotes]);

  const generalNotes = getNoteContent("generalNotes") || "";
  const generalNotesUpdated = getUpdatedAt("generalNotes");
  const allNotes = getKeys();
  const parksWithNotes =
    parks?.filter((park) => allNotes.includes(park.abbreviation)) || [];

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-4">
        <div
          {...a11yOnClick(() => navigate("/more/my-notes/general-notes"))}
          className="cursor-pointer"
        >
          <ListRow>
            <div className="flex flex-col gap-1">
              <h3>General Notes</h3>
              <p className="mb-2 text-gray-500 text-sm">
                Last updated:{" "}
                {generalNotesUpdated != undefined
                  ? dateHelper.toStringLong(new Date(generalNotesUpdated))
                  : "Not Available"}
              </p>
              <p
                className="overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words"
                style={{ hyphens: "auto" }}
              >
                {generalNotes || "No general notes yet"}
              </p>
            </div>
          </ListRow>
        </div>

        {/* Park Notes section */}
        {parksWithNotes.length === 0 ? (
          <p className="text-gray-600">No park notes found.</p>
        ) : (
          parksWithNotes.map((park) => (
            <div
              key={park.abbreviation}
              {...a11yOnClick(() =>
                navigate(`/locations/${park.abbreviation}?tab=notes`)
              )}
              className="cursor-pointer"
            >
              <ListRow>
                <div className="flex flex-col gap-1">
                  <h3>{park.parkName}</h3>
                  <p>{park.addresses[0]?.city}</p>
                  <p className="mb-2 text-gray-500 text-sm">
                    Last updated:{" "}
                    {getUpdatedAt(park.abbreviation)
                      ? dateHelper.toStringLong(
                          new Date(getUpdatedAt(park.abbreviation)!)
                        )
                      : "Not Available"}
                  </p>
                  <p
                    className="overflow-wrap-anywhere line-clamp-3 max-w-full hyphens-auto break-words"
                    style={{ hyphens: "auto" }}
                  >
                    {getNoteContent(park.abbreviation)}
                  </p>
                </div>
              </ListRow>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
