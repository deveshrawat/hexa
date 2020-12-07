import { useSelector } from 'react-redux';
import { FastBitcoinsState } from '../../../../store/reducers/fbtc';

export default function useFastBitcoinsState(): FastBitcoinsState {
  return useSelector(state => state.fbtc);
}
