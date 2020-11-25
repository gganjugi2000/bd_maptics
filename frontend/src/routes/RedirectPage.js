import React, { useEffect } from 'react';
import { useHistory } from "react-router";

const RedirectPage = () => {
    const history = useHistory();

    // life cycle
    useEffect(() => {
        routePage();
    });

    const routePage = () => {
      history.push({
        pathname:  "/advertiser"
      });
    }

    return (
      <></>        
    );
}

export default RedirectPage;