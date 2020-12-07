import { useMemo } from "react";
import useFastBitcoinsState from "./UseFastBitcoinsState";

export default function useFastBitcoinsDepositAccountShell() {
  const fastBitcoinsState = useFastBitcoinsState();

  return useMemo(() => {
    return fastBitcoinsState.currentDepositAccountShell;
  }, [fastBitcoinsState.currentDepositAccountShell]);
}
