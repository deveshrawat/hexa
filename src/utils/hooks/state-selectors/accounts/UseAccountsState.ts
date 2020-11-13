import { useSelector } from 'react-redux';
import { AccountsState } from '../../../../store/reducers/accounts';

function useAccountsState(): AccountsState {
  return useSelector(state => state.accounts);
}

export default useAccountsState;
