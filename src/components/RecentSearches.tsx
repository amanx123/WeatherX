import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card";
import { Location, getRecentSearchLocations } from "@/utils/storeRecent";
export default function RecentSearches({ lat, lon, onLocationSelect }: { lat: number, lon: number, onLocationSelect: (lat: number, lon: number) => void }) {

    const [recentSearches, setRecentSearches] = useState<Location[]>([]);
    useEffect(() => {
        setRecentSearches(getRecentSearchLocations());
    }, [lat, lon]);

    const handlePrevLocationClick = (location: Location) => {
        onLocationSelect(location.coordinates[0], location.coordinates[1])
    }
    return (
        (recentSearches.length > 0) &&
        <div className="max-w-[1200px] px-4 mx-auto mt-4">
            <div className="flex items-center justify-start mb-2">
                <h1 className="text-xl font-bold mr-4">Recent Searches</h1>
                <div className="flex-grow">
                    <hr className="border-gray-600" />
                </div>
            </div>
            <div className="mt-4 ">
                <Carousel opts={{ align: "start" }} className="w-full mx-auto max-w-[300px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1000px]">
                    <CarouselContent>
                        {recentSearches.map((location, index) => (
                            <CarouselItem key={index} className=" basis-1/2 md:basis-1/3 lg:basis-1/4" >
                                <Card className="bg-sky-100 border-none text-center cursor-pointer hover:opacity-60 transition" onClick={() => handlePrevLocationClick(location)}>
                                    <CardContent className="flex h-32 items-center justify-center p-4">
                                        <span className="text-lg sm:text-xl md:text-2xl font-medium">{location.name}</span>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}

                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />


                </Carousel>
            </div >
        </div >
    )
}
