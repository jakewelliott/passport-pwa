import type React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { a11yOnClick } from "@/lib/a11y";

interface ImageModalProps {
	photo: {
		url: string;
		caption?: string;
	};
	onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-system_black"
			style={{ zIndex: 9999 }}
		>
			<span
				className="absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-system_white"
				{...a11yOnClick(onClose)}
			>
				&times;
			</span>
			<TransformWrapper>
				<TransformComponent>
					<img
						src={photo.url}
						alt={photo.caption || "Photo"}
						className="max-h-screen max-w-full object-contain"
					/>
				</TransformComponent>
			</TransformWrapper>
			{photo.caption && (
				<div className="absolute right-0 bottom-4 left-0 bg-system_black bg-opacity-50 p-2 text-center text-system_white">
					{photo.caption}
				</div>
			)}
		</div>
	);
};
