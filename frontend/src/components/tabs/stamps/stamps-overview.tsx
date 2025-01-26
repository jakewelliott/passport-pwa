import React, { useState } from "react";
import { Park, parks, userStamps } from "../../../utils/StampsOverviewService";
import { StampsDetail } from "./stamp-detail";

export const StampsOverview = () => {
    const [selectedPark, setSelectedPark] = useState<Park | null>(null);

    const isAchieved = (parkCode: string) => userStamps.some(achievement => achievement.parkCode === parkCode);

    const sortedParks = parks.sort((a, b) => {
        const aAchieved = isAchieved(a.code);
        const bAchieved = isAchieved(b.code);
        if (aAchieved && !bAchieved) return -1;
        if (!aAchieved && bAchieved) return 1;
        return a.name.localeCompare(b.name);
    });

    const rows = [];
    for (let i = 0; i < sortedParks.length; i += 3) {
        rows.push(sortedParks.slice(i, i + 3));
    }

    return (
        <div className="mx-auto my-4">
            {rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    <div className="flex justify-evenly my-4 mx-9">
                        {row.map((park, parkIndex) => (
                            <button
                                key={parkIndex}
                                onClick={() => setSelectedPark(park)}
                                className="mx-3"
                            >
                                <img
                                    className={`w-24 h-24 object-contain ${isAchieved(park.code) ? 'opacity-100' : 'opacity-25'}`}
                                    src={park.stamp}
                                    alt={`${park.name} stamp`}
                                />
                            </button>
                        ))}
                    </div>

                    {selectedPark && row.some(p => p.code === selectedPark.code) && (
                        <StampsDetail park={selectedPark} isAchieved={isAchieved} onClose={() => setSelectedPark(null)}/>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
