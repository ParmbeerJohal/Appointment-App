import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import moment from 'moment';
//import moment from 'moment';

function AddAppointments(props) {

    const formDisplay = props.formDisplay;
    const toggleForm = props.toggleForm;
    const addAppointment = props.addAppointment;
    const isSafari = props.isSafari;

    const [startDate, setStartDate] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');

    const [formInput, setFormInput] = useState({
        petName: '',
        ownerName: '',
        aptNotes: '',
        aptDate: '',
        aptTime: '',
    });

    /*
    * This function handles state change
    * for each of the form input values
    */
    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormInput(formInput => ({
            ...formInput,
            [name]: value
        }));
    };

    /*
    * This function handles the submitted form
    * and adds the appointment to the list.
    */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        var data;

        if(isSafari) {
            const dateArray = [
                moment(startDate).year(),
                moment(startDate).month(),
                moment(startDate).date()
            ];

            const dateData = moment(dateArray).format('YYYY-MM-DD');
            const timeData = timeValue;

            data = {
                petName: formInput.petName,
                ownerName: formInput.ownerName,
                aptNotes: formInput.aptNotes,
                aptDate: dateData + ' ' + timeData
            };
        } else {
            data = {
                petName: formInput.petName,
                ownerName: formInput.ownerName,
                aptNotes: formInput.aptNotes,
                aptDate: formInput.aptDate + ' ' + formInput.aptTime
            };
        }

        addAppointment(data);

        // Clear the form inputs
        setFormInput({
            petName: '',
            ownerName: '',
            aptNotes: '',
            aptDate: '',
            aptTime: '',
        });

        // Close the form after submission
        toggleForm();

    }

    return (
        
        <div
            className={'card textcenter mt-3 ' + (formDisplay ? '' : 'add-appointment')}
        >
            <div
                className="apt-addheading card-header bg-primary text-white"
                onClick={toggleForm}
            >
                <FaPlus /> Add Appointment
            </div>

            <div className="card-body">
                <form id="aptForm" noValidate onSubmit={handleFormSubmit}>
                    <div className="form-group form-row">
                        <label
                            className="col-md-2 col-form-label text-md-right"
                            htmlFor="petName"
                            readOnly
                        >
                            Pet Name
                        </label>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                name="petName"
                                placeholder="Pet's Name"
                                value={formInput.petName}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label
                            className="col-md-2 col-form-label text-md-right"
                            htmlFor="ownerName"
                        >
                            Pet Owner
                        </label>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="form-control"
                                name="ownerName"
                                placeholder="Owner's Name"
                                value={formInput.ownerName}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label
                            className="col-md-2 col-form-label text-md-right"
                            htmlFor="aptDate"
                        >
                            Date
                        </label>
                        <div className="col-md-4">
                            {isSafari ? (
                                <DatePicker
                                    value={startDate}
                                    onChange={setStartDate}
                                    
                                />
                            ) : (
                                <input
                                    type="date"
                                    className="form-control"
                                    name="aptDate"
                                    id="aptDate"
                                    placeholder="YYYY-MM-DD"
                                    value={formInput.aptDate}
                                    onChange={handleFormChange}
                                />
                            )}
                            
                        </div>
                        <label
                            className="col-md-2 col-form-label text-md-right"
                            htmlFor="aptTime"
                        >
                            Time
                        </label>
                        <div className="col-md-4">
                            {isSafari ? (
                                <TimePicker
                                    value={timeValue}
                                    onChange={setTimeValue}
                                />
                            ) : (
                                <input
                                    type="time"
                                    className="form-control"
                                    name="aptTime"
                                    id="aptTime"
                                    placeholder="HH:MM"
                                    value={formInput.aptTime}
                                    onChange={handleFormChange}
                                />
                            )}
                        </div>
                    </div>

                    <div className="form-group form-row">
                        <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                            Apt. Notes
                        </label>
                        <div className="col-md-10">
                            <textarea
                                className="form-control"
                                rows="4"
                                cols="50"
                                name="aptNotes"
                                id="aptNotes"
                                placeholder="Appointment Notes"
                                value={formInput.aptNotes}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="form-group form-row mb-0">
                        <div className="offset-md-2 col-md-10">
                            <button
                                type="submit"
                                className="btn btn-primary d-block ml-auto"
                            >
                                Add Appointment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAppointments;