/**
 * Customer-facing booking shape from GET /api/v1/users/bookings.
 * Differs from admin/provider Booking: user_id is string, service_provider_id is populated.
 */
export interface CustomerBookingAddress {
  city: string;
  area: string;
  pincode: string;
}

export interface CustomerBookingServiceProvider {
  _id: string;
  category_id: string;
  city: string;
  area: string;
  pincode: string;
  base_price: number;
}

export type CustomerBookingStatus =
  | 'requested'
  | 'accepted'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface CustomerBooking {
  _id: string;
  user_id: string;
  service_provider_id: CustomerBookingServiceProvider;
  address: CustomerBookingAddress;
  schedule_at: string;
  before_image?: string | null;
  after_image?: string | null;
  price: number;
  status: CustomerBookingStatus;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/** Pagination from GET /api/v1/users/bookings. */
export interface CustomerBookingsPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/** Response shape for GET /api/v1/users/bookings (list with pagination). */
export interface CustomerBookingsResponse {
  bookings: CustomerBooking[];
  pagination: CustomerBookingsPagination;
}
