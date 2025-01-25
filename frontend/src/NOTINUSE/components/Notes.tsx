import { useState, useEffect } from "react";

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
		<div className="p-6 bg-gray-100">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">My Notes</h1>
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="space-y-4">
					<textarea
						value={note}
						onChange={(e) => setNote(e.target.value)}
						placeholder="Write your note here..."
						rows={4}
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
					/>
					<button
						onClick={handleSaveNote}
						type="button"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
					>
						Save Note
					</button>
				</div>
				{savedNote && (
					<div className="mt-6 pt-6 border-t border-gray-200">
						<h3 className="text-xl font-semibold mb-3 text-gray-700">
							Saved Note:
						</h3>
						<p className="text-gray-600 whitespace-pre-wrap">{savedNote}</p>
					</div>
				)}
			</div>
		</div>
	);
}
