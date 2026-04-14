interface cardProps {
    title: string;
    value: string;
}

export function Card({ title, value }: cardProps) {
    return (
        <div className="bg-gray-800 p-5 rounded-xl shadow-md flex flex-col gap-2">
            <span className="text-sm text-gray-400">{title}</span>
            <strong className="text-2xl">{value}</strong>
        </div>
    );
}