export interface DataMapper<E, D> {
    toDto(entity: E): D;
    fromDto(dto: D): E;
}