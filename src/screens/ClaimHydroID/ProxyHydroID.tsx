import React, { useContext } from 'react';

import ViewHydroID from './ViewHydroID';
import ClaimHydroID from './ClaimHydroID';
import { AppStateManagerContext } from '../../context/AppStateManager';

const ProxyHydroID = () => {
  const { appState } = useContext(AppStateManagerContext);
  return ((appState.EIN) ? ( <ViewHydroID/> ) : ( <ClaimHydroID/> ))
}

export default ProxyHydroID;