interface ProgressIndicatorProps {
  step: number;
  totalSteps: number;
}

export function ProgressIndicator({
  step,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-full h-2 rounded-full ${
            i < step ? "bg-green-600" : "bg-primary"
          }`}
        />
      ))}
    </div>
  );
}
