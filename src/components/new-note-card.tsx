import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard ({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState("")

  function handleStartEditor() {
    setShouldShowOnboard(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if(event.target.value === '') {
      setShouldShowOnboard(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') return

    onNoteCreated(content)

    setContent('')

    toast.success("Nota criada com sucesso")
    setShouldShowOnboard(true)
  }

  function handleStartRecording() {
    setIsRecording(true)
  }

  function handleStopRecording() {
    setIsRecording(false)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-1 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em aúdio convertido para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">

        </Dialog.Overlay>
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 outline-none bg-slate-800 p-1.5 text-slate-400 hover:text-slate-200">
            <X className="size-5"/>
          </Dialog.Close>

          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className='text-sm font-medium text-slate-200'>
                Adicionar nota
              </span>
              {shouldShowOnboard ? (
                <p className='text-sm leading-6 text-slate-400'>
                Comece <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleStartRecording}>gravando uma nota</button> em áudio ou se preferir <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleStartEditor}>utilize apenas texto</button>.
              </p>
              ) : (
                <textarea 
                  autoFocus 
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button 
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              onClick={handleStopRecording}
            >
              <div className="size-3 rounded-full bg-red-500 animate-pulse" />
              Gravando! (Clique p/ Interromper) 
            </button>
            ) : (
              <button 
              type="button"
              onClick={handleSaveNote}
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Salvar Nota 
            </button>
            )}
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 