/**
 * Definition of other types required
 * by the app
 */
// TODO: these types may need to be aligned with the PagoPA ones
// @https://www.pivotaltracker.com/story/show/157769657

/**
 * This type represents a transaction (or payment)
 * carried out by the user; it contains the information
 * needed for UI-related purposes
 */
export type WalletTransaction = {
  cardId: number;
  date: string;
  time: string;
  paymentReason: string;
  recipient: string;
  amount: number;
  currency: string;
  transactionCost: number;
  isNew: boolean;
};

export const UNKNOWN_TRANSACTION: WalletTransaction = {
  cardId: -1,
  date: "",
  time: "",
  paymentReason: "UNKNOWN TRANSACTION",
  recipient: "",
  amount: 0,
  currency: "?",
  transactionCost: 0,
  isNew: false
};

/**
 * This type represent the details of a transaction the user should display
 * after he declare to proceed with the transaction with the selected payment method.
 */
export type AcceptedTransaction = {
  currentAmount: number;
  fee: number;
  totalAmount: number; // it should be obtained as sum of the "currrentAmount" and the "fee"
  paymentReason: string;
  entityName: string;
  date: Date;
};
