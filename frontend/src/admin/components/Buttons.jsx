import { MdDelete, MdModeEdit } from 'react-icons/md';

export const DeleteButton = ({ func, data }) => {
  return (
    <div>
      <MdDelete size={20} className='mt-2 text-red-600 cursor-pointer' onClick={() => func(data)} />
    </div>
  );
};

export const EditButton = ({ func, data }) => {
  return (
    <div>
      <MdModeEdit
        size={20}
        className='mt-2 text-gray-600 cursor-pointer'
        onClick={() => func(data)}
      />
    </div>
  );
};

// Backward compatibility aliases
export const UserDeleteButton = DeleteButton;
export const UserEditButton = EditButton;
export const HostelDeleteButton = DeleteButton;
export const HostelEditButton = EditButton;
export const PGDeleteButton = DeleteButton;
export const PGEditButton = EditButton;
export const FlatDeleteButton = DeleteButton;
export const FlatEditButton = EditButton;
