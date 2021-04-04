import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

function ListAppointments(props) {

    const appointments = props.appointments;
    const deleteAppointment = props.deleteAppointment;

    //console.log(appointments);

    const listItems = appointments.map((item) => (
        <div className="pet-item col media py-3" key={item.id}>
                <div className="mr-3">
                    <button
                        className="pet-delete btn btn-sm btn-danger"
                        onClick={() => deleteAppointment(item)}
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="pet-info media-body">
                    <div className="pet-head d-flex">
                        <span className="pet-name">{item.id}--{item.petName}</span>
                        <span className="apt-date ml-auto">
                            <Moment
                                date={item.aptDate}
                                parse="YYYY-MM-DD hh:mm"
                                format="MMM D, YYYY h:mma"
                            />
                        </span>
                    </div>

                    <div className="owner-name">
                        <span className="label-item">Owner: </span>
                        <span>{item.ownerName}</span>
                    </div>
                    <div className="apt-notes">{item.aptNotes}</div>
                </div>
            </div>
    ))

    return (
        <div className="appointment-list item-list mb-3">
            {listItems}
        </div>
    );
}

export default ListAppointments;