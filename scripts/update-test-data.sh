# ADAM:
# I ran into issues dumping the geojson data, so I'm not using this script right now
# Just use dbBeaver to dump the data

# # This script starts the backend and dumps each table into a json file

# TABLES_PATH="../frontend/src/lib/testing/mock/tables"

# # Create tables directory if it doesn't exist
# mkdir -p "$TABLES_PATH"

# TABLES=(
#     "bucket_list_items"
#     "collected_stamps"
#     "completed_bucket_list_items"
#     "park_addresses"
#     "park_icons"
#     "park_photos"
#     "park_visits"
#     "parks"
#     "private_notes"
#     "trail_icons"
#     "trails"
#     "users"
# )

# # Get credentials from .env
# source ../.env
# echo DB_DEV_HOST: $DB_DEV_HOST
# echo DB_DEV_PORT: $DB_DEV_PORT
# echo DB_DEV_DATABASE: $DB_DEV_DATABASE

# # Function to check if database is ready
# wait_for_db() {
#     local max_attempts=30
#     local attempt=1
    
#     while [ $attempt -le $max_attempts ]; do
#         if mysqladmin -h "$DB_DEV_HOST" -P "$DB_DEV_PORT" -u root -p"$DB_DEV_PASSWORD" ping > /dev/null 2>&1; then
#             echo "Database is ready"
#             return 0
#         fi
#         echo "Waiting for database to be ready (attempt $attempt/$max_attempts)..."
#         sleep 2
#         attempt=$((attempt + 1))
#     done
#     echo "Database failed to start"
#     return 1
# }

# # Start the backend in the background
# npm run backend & BACKEND_PID=$!

# # Wait for the database to be ready
# if ! wait_for_db; then
#     kill $BACKEND_PID 2>/dev/null || true
#     exit 1
# fi

# # Function to cleanup on exit
# cleanup() {
#     echo "Cleaning up..."
#     kill $BACKEND_PID 2>/dev/null || true
# }
# trap cleanup EXIT

# # Connect to the database with mysql and dump each table into a json file
# for TABLE in "${TABLES[@]}"; do
#     echo "Dumping table: $TABLE"
    
#     # Get column names
#     columns=$(mysql -h "$DB_DEV_HOST" -P "$DB_DEV_PORT" -u root -p"$DB_DEV_PASSWORD" "$DB_DEV_DATABASE" -N -e "SELECT GROUP_CONCAT(COLUMN_NAME) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '$DB_DEV_DATABASE' AND TABLE_NAME = '$TABLE';")
    
#     # Build the JSON_OBJECT query with column names
#     json_query="SELECT JSON_ARRAYAGG(JSON_OBJECT("
#     first=true
#     for col in $(echo $columns | tr ',' ' '); do
#         if [ "$first" = true ]; then
#             first=false
#         else
#             json_query="$json_query, "
#         fi
#         json_query="$json_query'$col', $col"
#     done
#     json_query="$json_query)) FROM $TABLE;"
    
#     # Execute the query
#     if ! mysql -h "$DB_DEV_HOST" -P "$DB_DEV_PORT" -u root -p"$DB_DEV_PASSWORD" "$DB_DEV_DATABASE" -N -e "$json_query" > "$TABLES_PATH/$TABLE.json"; then
#         echo "Error dumping table $TABLE"
#         exit 1
#     fi
# done

# echo "Data dump completed successfully"
