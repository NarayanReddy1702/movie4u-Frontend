function UserTable() {
  const HandleUpdate = () => {
    alert("you are going to delete this") 
  }

  const handleDelete = (id) => {
    console.log(id);
    confirm(`Are you sure to delete this id(${id}) user data`)
    deleteData(id)
  }


  return (
    <>
    {isLoading?<>
            <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div></>: <div className="container mx-auto p-4 md:p-6">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full w-max md:w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  SI NO
                </th>
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  UserName
                </th>
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  PassWord
                </th>
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Edit
                </th>
                <th className="px-4 md:px-6 py-2 md:py-3 border text-center border-gray-300 text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
           { userData.map((val,index)=>{
            return (
              
              <tr className="hover:bg-gray-50" >
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">{index+1}</td>
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 uppercase text-sm">{val.name}</td>
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">{val.email}</td>
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300 text-sm">{val.password}</td>
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                <button className='border-2 bg-green-600 text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-green-600 hover:bg-transparent hover:border-green-600 cursor-pointer' onClick={HandleUpdate}>Edit</button>
              </td>
              <td className="px-4 md:px-6 py-2 md:py-4 border text-center border-gray-300">
                <button className='border-2 bg-red-600 text-white px-2 md:px-3 py-1 text-sm rounded-md hover:text-red-600 hover:bg-transparent hover:border-red-600 cursor-pointer' onClick={()=>handleDelete(val.id)}>Delete</button>
              </td>
            </tr>
            )
           })}

            </tbody>
          </table>
        </div>
      </div>}
     
    </>
  )
}

export default UserTable