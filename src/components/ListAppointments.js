import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

//import DOMPurify from 'dompurify';

function ListAppointments(props) {

    var appointments = props.appointments;
    const deleteAppointment = props.deleteAppointment;
    const queryText = props.queryText;

    //console.log(appointments);

    if(queryText.trim().length !== 0) {
        appointments = appointments.filter(item => (
            item['petName'].toLowerCase().includes(queryText.toLowerCase()) ||
            item['ownerName'].toLowerCase().includes(queryText.toLowerCase()) ||
            item['aptNotes'].toLowerCase().includes(queryText.toLowerCase())
        ));

        // TODO: add highlight to matching text
        // appointments.map(item => {
        //     item.petName = item.petName.replace(queryText.trim(),'<mark>' + queryText.trim() + '</mark>');
        //     return item;
        // });
    }

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
                        <span className="pet-name">{item.petName}</span>
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