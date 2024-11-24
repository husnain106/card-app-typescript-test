import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Entry, EntryContextType } from '../@types/context'
import { EntryContext } from '../utilities/globalContext'

export default function EditEntry(){
    const {id} = useParams()
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(), scheduledDate: new Date()}

    const { updateEntry, entries } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)

    useEffect(() =>{
        const entry = entries.filter(entry=> entry.id == id)[0]
        setNewEntry(entry)
    },[])
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        updateEntry(id as string,newEntry)
    }
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
            <input className="p-3 rounded-md text-black" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className="p-3 rounded-md text-black" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <p>Enter date to scheduled the task for</p>
            <input className="p-3 rounded-md text-black" type="date" name="scheduledDate" value={(new Date(newEntry.scheduledDate)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <p>Enter date of creating the task</p>
            <input className="p-3 rounded-md text-black" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Update</button>
        </section>
    )
}