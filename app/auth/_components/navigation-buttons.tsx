import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface NavigationButtonsProps {
  step: number
  handleBack: () => void
  handleContinue: () => void
  isNextDisabled: boolean
}

export function NavigationButtons({ step, handleBack, handleContinue, isNextDisabled }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between">
      {step > 1 && (
        <Button 
          variant="outline"
          onClick={handleBack}
          className="flex items-center bg-muted-foreground/20 border-none hover:bg-muted-foreground/20 hover:text-white"
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Atrás
        </Button>
      )}
      {step < 4 && (
        <Button 
          onClick={handleContinue}
          disabled={isNextDisabled}
          className="flex items-center ml-auto bg-green-600 hover:bg-green-700"
        >
          Continuar
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}