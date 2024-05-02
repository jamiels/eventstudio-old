import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TableCmp from "../../components/global/Table";
import Speaker from "../../apis/dashboard/speaker";
import Sponsorship from "../../apis/dashboard/sponsorship";
import {
    createColumnHelper
} from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';

const EventDetailsPage = withSwal((props) => {
    const columnHelper = createColumnHelper();

    const { eventId } = useParams();
    const [speakers, setSpeakers] = useState([]);
    const [sponsorships, setSponsorships] = useState([]);
    const [reload, setReload] = useState(false);
    const { swal, ...rest } = props;
    const fetchSpeaker = () => {
        // Fetch speakers for the event
        Speaker.getSpeakersByEvent(eventId)
            .then((res) => {
                setSpeakers(res.speakers);
                setReload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchSponsorships = () => {
        // Fetch sponsorships for the event
        Sponsorship.getSponsorshipsByEvent(eventId)
            .then((res) => {
                setSponsorships(res.sponsorships);
                setReload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchSpeaker();
        fetchSponsorships();
    }, [eventId]);

    useEffect(() => {
        if (reload == true) {
            fetchSpeaker();
            fetchSponsorships();
        }
    }, [reload]);


    const DeleteBtnClick = (id, type) => {
        swal.fire({
            title: 'Delete',
            text: `Are you sure you want to delete this ${type}?`,
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    if (type === 'speaker') {
                        Speaker.deleteSpeaker(id)
                            .then((data) => {
                                console.log(data);
                                setReload(true);
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else if (type === 'sponsorship') {
                        Sponsorship.deleteSponsorship(id)
                            .then((data) => {
                                console.log(data);
                                setReload(true);
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    }
                }
            });
    };

    const speakerColumns = [
        columnHelper.accessor('firstName'),
        columnHelper.accessor('lastName'),
        columnHelper.accessor('emailAddress'),
        columnHelper.accessor('primaryAffiliation'),
        columnHelper.accessor('title'),
        columnHelper.accessor('headshot'),
        columnHelper.accessor('linkedInURL'),
        columnHelper.accessor('twitterURL'),
        columnHelper.accessor('bio'),
        columnHelper.accessor('adminFullName'),
        columnHelper.accessor('adminEmailAddress'),
        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <button onClick={() => DeleteBtnClick(props.row.original.id, 'speaker')} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                        <i className="ki ki-trash fs-2"></i>
                    </button>
                </>
            ),
        }),
    ];

    const sponsorshipColumns = [
        columnHelper.accessor('organization_id'),
        columnHelper.accessor('event_id'),
        columnHelper.accessor('deckSent'),
        columnHelper.accessor('commitmentAmount'),
        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <button onClick={() => DeleteBtnClick(props.row.original.id, 'sponsorship')} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                        <i class="ki-outline ki-trash fs-2"></i>
                    </button>
                </>
            ),
        }),
    ];

    return (
        <div>
            <h1>Event Details</h1>
            <div className="my-15">
                <h2>Speakers</h2>
                <TableCmp data={speakers} columns={speakerColumns} />
            </div>
            <div className="my-15">
                <h2>Sponsorships</h2>
                <TableCmp data={sponsorships} columns={sponsorshipColumns} />
            </div>
        </div>
    );
});

export default EventDetailsPage;
