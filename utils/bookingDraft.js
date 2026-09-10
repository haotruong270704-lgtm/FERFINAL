const BOOKING_DRAFT_KEY = 'nails_service_booking_draft';

export const saveBookingDraft = (draft) => {
  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
};

export const readBookingDraft = () => {
  const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    return null;
  }
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(BOOKING_DRAFT_KEY);
};
