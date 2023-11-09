import { Table, Column, Model, CreatedAt, UpdatedAt, DataType, Unique } from 'sequelize-typescript';

@Table
export class CartItem extends Model<CartItem> {
  
  @Unique
  @Column
  public name!: string;

  @Column
  public path!: string;

  @Column(DataType.FLOAT)
  public price!: number;

  @Column
  public description!: string;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
