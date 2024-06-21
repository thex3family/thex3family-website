import pandas as pd

# Load the spreadsheet data
file_path = r"C:\Users\xb1to\Downloads\Co-x3 Reviews 70be46e5f21f4850997f93ab82d8bb01.csv"
spreadsheet_data = pd.read_csv(file_path)

# Function to convert stars to numeric
def stars_to_numeric(stars):
    return len(stars.strip('⭐')) if isinstance(stars, str) else None

# Try different formats for date conversion
def parse_date(date_str):
    for fmt in ('%B %d, %Y %I:%M %p', '%m/%d/%Y %I:%M %p', '%Y-%m-%d %H:%M:%S'):
        try:
            return pd.to_datetime(date_str, format=fmt)
        except (ValueError, TypeError):
            continue
    return pd.to_datetime(date_str, errors='coerce')

# Apply date parsing
spreadsheet_data['Created on'] = spreadsheet_data['Created on'].apply(parse_date)
spreadsheet_data['webflow_stars'] = spreadsheet_data['Rating'].apply(stars_to_numeric)

# Function to escape single quotes in string literals
def escape_single_quotes(value):
    if isinstance(value, str):
        return value.replace("'", "''")
    return value

# Open a file to write the insert statements using UTF-8 encoding
with open("co_x3_query.txt", "w", encoding='utf-8') as file:
    for index, row in spreadsheet_data.iterrows():
        # Handle possible NaN values in optional fields
        webflow_id = escape_single_quotes(row['webflow_id'])
        newsletter = escape_single_quotes(row['newsletter'] or '')
        review = escape_single_quotes(row['Review'] or '')
        name = escape_single_quotes(row['Name'] or '')
        recommend = escape_single_quotes(row['Recommend'] or '')
        referral = escape_single_quotes(row['Referral'] or '')
        platform = escape_single_quotes(row['Platform'] or '')
        contact = escape_single_quotes(row['Contact'] or '')
        rating = escape_single_quotes(row['Rating'] or '')
        profile_pic = escape_single_quotes(row['Profile Pic'] or '')
        created_on = row['Created on'].strftime('%Y-%m-%d %H:%M:%S') if pd.notnull(row['Created on']) else ''
        review_quality = escape_single_quotes(row['Review Quality'] or '')
        webflow_sync = escape_single_quotes(row['Webflow Sync'] or '')
        webflow_stars = row['webflow_stars']
        webflow_slug = escape_single_quotes(row['webflow_slug'])

        # Construct the insert statement
        insert_statement = (
            f"INSERT INTO current_reviews (webflow_id, newsletter, review, name, recommend, referral, platform, "
            f"contact, rating, profile_pic, created_on, review_quality, webflow_sync, webflow_stars, webflow_slug) "
            f"VALUES ('{webflow_id}', '{newsletter}', '{review}', '{name}', '{recommend}', '{referral}', '{platform}', "
            f"'{contact}', '{rating}', '{profile_pic}', '{created_on}', '{review_quality}', '{webflow_sync}', "
            f"{webflow_stars}, '{webflow_slug}');\n"
        )

        # Verify that the statement is complete
        if not insert_statement.endswith(";\n"):
            raise ValueError(f"Incomplete SQL statement detected: {insert_statement}")

        file.write(insert_statement)
