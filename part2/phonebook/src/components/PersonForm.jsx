
import React from 'react'

const PersonForm = ({addPhoneBook, newName, setNewName, newPhone, setNewPhone}) => {
  return (
    <>
        <form onSubmit={addPhoneBook}>
            <div>
                name: <input value={newName} onChange={(e) => setNewName(e.target.value.trim())}/>
            </div>
            <div>
                number : <input value={newPhone}  onChange={(e) => setNewPhone(e.target.value.trim())} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>
  )
}

export default PersonForm