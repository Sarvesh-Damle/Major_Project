import { MdDelete, MdModeEdit } from "react-icons/md";

export const UserDeleteButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdDelete size={20} className="mt-2 text-red-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const UserEditButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdModeEdit size={20} className="mt-2 text-gray-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const HostelDeleteButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdDelete size={20} className="mt-2 text-red-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const HostelEditButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdModeEdit size={20} className="mt-2 text-gray-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const PGDeleteButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdDelete size={20} className="mt-2 text-red-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const PGEditButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdModeEdit size={20} className="mt-2 text-gray-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const FlatDeleteButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdDelete size={20} className="mt-2 text-red-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}

export const FlatEditButton = (prop) => {
    const handleClick = () => {
        prop.func(prop.data);
    }
  return (
    <div>
        <MdModeEdit size={20} className="mt-2 text-gray-600 cursor-pointer" onClick={handleClick}/>
    </div>
  )
}