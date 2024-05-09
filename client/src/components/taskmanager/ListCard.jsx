/* eslint-disable react/prop-types */
import './listcard.scss';
import { BiChevronLeft, BiChevronRight, BiTrash, BiEditAlt } from 'react-icons/bi';
import { arrowClick, deleteItem, editTask} from '../../redux/taskSlice';
import { useDispatch } from 'react-redux';

const ListCard = (items) => {
	const { item } = items;

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string));
	};
	const handleDelete = () => {
		dispatch(deleteItem(item._id));
	};

	const handleEdit = () => {
        // Implement handleEdit function to dispatch editTask action
        const editedTask = prompt("Enter the updated task:", item.task); // Prompt user for updated task
        if (editedTask !== null) { // Check if user didn't cancel the prompt
            dispatch(editTask(item._id, editedTask)); // Dispatch editTask action with item ID and updated task content
        }
    };

	return (
		<div>
			<ul className={` ${item.status === 'done' ? 'completed menu' : 'menu'}`}>
				<li>
					<p>{item._id}</p>
				</li>
				<li>
					<p>{item.task}</p>
				</li>
				<li>
					<p>{item.status}</p>
				</li>
				<li>
					<button
						disabled={item.status === 'backlog'}
						onClick={() => ArrowClick('left')}
					>
						<BiChevronLeft />
					</button>
					<button
						disabled={item.status === 'done'}
						onClick={() => ArrowClick('right')}
					>
						<BiChevronRight />
					</button>
					<button onClick={handleDelete}>
						<BiTrash />
					</button>
					<button onClick={handleEdit}>
					<BiEditAlt/>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default ListCard;
