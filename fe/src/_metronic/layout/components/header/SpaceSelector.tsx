import React, { FC, useEffect, useState } from 'react';
import { useSpace } from '../../../../app/context/space.provider'; // Import the useSpace hook from SpaceContext
import spaceApi from '../../../../app/apis/dashboard/space'; // Import the space API

const SpaceSelector: FC = () => {
    const { selectedSpace, updateSelectedSpace, setSpaces, spaces } = useSpace(); // Get the selectedSpace and setSelectedSpace from the SpaceContext

    useEffect(() => {
        // Fetch the spaces when the component mounts
        spaceApi.getSpaces()
            .then((res) => {
                setSpaces(res?.userSpaces);
                // Check if selectedSpace is not set or if its space_name is not defined
                if (!selectedSpace || !selectedSpace.space || !selectedSpace.space.space_name) {
                    // Find the object with space_name "Default Space"
                    const defaultSpace = res.userSpaces.find((space: any) => space.space.space_name === "Default Space");
                    // If the default space is found, update the selected space
                    if (defaultSpace) {
                        updateSelectedSpace(defaultSpace);
                    }
                }
            })
            .catch((error) => console.error('Error fetching spaces:', error));
    }, []);


    const handleSpaceSelect = (space: {}) => {
        updateSelectedSpace(space);
    };

    return (
        <div className='d-flex align-items-center ms-lg-5' id='kt_header_user_menu_toggle'>
            <div
                className='d-flex align-items-center py-2 px-2 px-md-3'
                data-kt-menu-placement='bottom-end'
            >
                <div className='menu-item px-5 mx-5 dropdown'>
                    <button className='btn btn-link dropdown-toggle' type='button' id='spaceSelectorDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
                        {selectedSpace ? selectedSpace?.space?.space_name : 'Select Space'}
                    </button>
                    <ul className='dropdown-menu overflow-auto' style={{ height: '200px' }} aria-labelledby='spaceSelectorDropdown'>
                        {spaces.map((space: any, index) => (
                            <li key={index} onClick={() => handleSpaceSelect(space)} className='dropdown-item'>{space?.space?.space_name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export { SpaceSelector };
