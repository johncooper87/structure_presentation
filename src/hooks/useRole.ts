const useRole = () => useSelector((state: AppState) => state.auth?.role.id);

export default useRole;
