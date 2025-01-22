import { useState, useEffect } from "react";
import "../App.css";
import { GPSTester } from "../components/GPSTester";

export default function Notes() {
	const [note, setNote] = useState("");
	const [savedNote, setSavedNote] = useState("");

	useEffect(() => {
		const saved = localStorage.getItem("userNote");
		if (saved) {
			setSavedNote(saved);
		}
	}, []);

	const handleSaveNote = () => {
		localStorage.setItem("userNote", note);
		setSavedNote(note);
		setNote(""); // Clear input after saving
	};

	return (
		<div className="notes-page">
			<h1>My Notes</h1>
			<div className="card">
				<div className="note-input">
					<textarea
						value={note}
						onChange={(e) => setNote(e.target.value)}
						placeholder="Write your note here..."
						rows={4}
					/>
					<button onClick={handleSaveNote} type="button">
						Save Note
					</button>
				</div>
				{savedNote && (
					<div className="saved-note">
						<h3>Saved Note:</h3>
						<p>{savedNote}</p>
					</div>
				)}
			</div>
			<div>
				<GPSTester />
			</div>
		</div>
	);
}
