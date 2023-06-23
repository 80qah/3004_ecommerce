import psycopg2

#To check a product's availability
def check_product_availability(product_id):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        user= 'postgres',
        password= 'root',
        host= 'localhost',
        port= 5434,
        database= 'ecommerce-db',
    )

    # Create a cursor object to interact with the database
    cur = conn.cursor()

    try:
        # Execute the SQL query to check the product's availability
        cur.execute("SELECT stock FROM product WHERE product_id = %s", (product_id,))
        stock = cur.fetchone()

        if stock is not None:
            stock = stock[0]
            if stock > 0:
                print("Product is available. Stock: ", stock)
            else:
                print("Product is out of stock.")
        else:
            print("Product not found.")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while checking product availability:", error)

    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()

# Usage example
product_id = 1  # ID for Farm Fresh Eggs (12-pack)

check_product_availability(product_id)

#To update the stock level of a product
def update_stock_levels(product_id, new_stock):
    # Establish a connection to the PostgreSQL database
    conn = psycopg2.connect(
        user= 'postgres',
        password= 'root',
        host= 'localhost',
        port= 5434,
        database= 'ecommerce-db',
    )


    try:
        # Create a cursor object to interact with the database
        cursor = conn.cursor()

        # Construct the SQL statement to update stock levels
        sql = "UPDATE Product SET Stock = %s WHERE product_id = %s"

        # Execute the SQL statement with the provided values
        cursor.execute(sql, (new_stock, product_id))

        # Commit the changes to the database
        conn.commit()

        print("Stock levels have been updated successfully!")

    except (Exception, psycopg2.Error) as error:
        print("Error updating stock levels:", error)

    finally:
        # Close the cursor and connection
        if conn:
            cursor.close()
            conn.close()

# Usage example
product_id = 1  # ID for Farm Fresh Eggs (12-pack)
new_stock = 50  # New stock level for product_id = 1

update_stock_levels(product_id, new_stock)


#To reserve inventory
import psycopg2

def reserve_inventory(product_id, quantity):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        user= 'postgres',
        password= 'root',
        host= 'localhost',
        port= 5434,
   # Create a cursor object to interact with the database
         database= 'ecommerce-db',
    )

    cur = conn.cursor()

    try:
        # Start a transaction
        conn.autocommit = False

        # Check if there is sufficient stock available
        cur.execute("SELECT stock FROM product WHERE product_id = %s", (product_id,))
        current_stock = cur.fetchone()[0]

        if current_stock >= quantity:
            # Update the stock by subtracting the reserved quantity
            cur.execute("UPDATE product SET stock = stock - %s WHERE product_id = %s", (quantity, product_id))

            # Perform any additional steps for inventory reservation, such as logging or updating reservation records

            # Commit the transaction
            conn.commit()
            print("Inventory reserved successfully.")
        else:
            print("Insufficient stock for reservation.")

    except (Exception, psycopg2.DatabaseError) as error:
        # Roll back the transaction in case of any error
        conn.rollback()
        print("Error while reserving inventory:", error)

    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()

# Usage example
product_id = 1  # ID for Farm Fresh Eggs (12-pack)
new_stock = 50  # New stock level for product_id = 1

reserve_inventory(product_id, quantity)
