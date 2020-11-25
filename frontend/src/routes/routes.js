import React, { useEffect } from 'react';
import { useHistory } from "react-router";

const routes = () => {
    const history = useHistory();

    // life cycle
    useEffect(() => {
      redirectPage();
    });

    const redirectPage = () => {
      history.push({
        pathname:  "/advertiser"
      });
    }

    return (
      <></>        
    );
}

export default routes;