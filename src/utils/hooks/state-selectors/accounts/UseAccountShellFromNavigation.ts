import { useMemo } from 'react';
import AccountShell from '../../../../common/data/models/AccountShell';
import useAccountShellForID from './UseAccountShellForID';


export default function useAccountShellFromNavigation(navigation: any): AccountShell | undefined {
  const accountShellID: string = useMemo(() => {
    return navigation.getParam('accountShellID') || '';
  }, [navigation]);

  return useAccountShellForID(accountShellID);
}
