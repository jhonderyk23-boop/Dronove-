-- Public website endpoints are callable by anon only.
-- Do not expose SECURITY DEFINER RPCs to authenticated sessions or PUBLIC.
REVOKE EXECUTE ON FUNCTION public.create_public_booking(jsonb) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.create_public_booking(jsonb) TO anon;

REVOKE EXECUTE ON FUNCTION public.public_busy_slots(date) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.public_busy_slots(date) TO anon;

REVOKE EXECUTE ON FUNCTION public.public_featured_tattoos(integer) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.public_featured_tattoos(integer) TO anon;

REVOKE EXECUTE ON FUNCTION public.record_portfolio_open(uuid) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.record_portfolio_open(uuid) TO anon;
