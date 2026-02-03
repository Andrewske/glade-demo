#!/usr/bin/env python3
"""
Scrape Glade.ai help documentation to understand product features.
"""

import requests
import re
import time
import json
from bs4 import BeautifulSoup

# Categories for Bankruptcy Legal Teams
CATEGORIES = {
    "Get Started": "1301121",
    "Set up & Manage Business": "1678977",
    "Support Your Clients": "1005057",
    "Consultations": "1004993",
    "Credit Report": "1005121",
    "Client Questionnaire": "999105",
    "Document Checklist": "999169",
    "Case Initiation": "1679041",
    "Invoices & Retainers": "1679425",
    "Schedules Builder": "1728321",
    "Income Organizer": "1005185",
    "eFiling Agent": "1728385",
}

CLIENT_CATEGORIES = {
    "Get Started (Client)": "1679169",
    "Upload and Sign Documents": "1679233",
    "Client Questionnaire (Client)": "1679361",
}

def fetch_category_articles(category_id: str) -> list[str]:
    """Fetch all article IDs from a category page."""
    url = f"https://glade.frontkb.com/en/categories/{category_id}"
    response = requests.get(url)
    response.raise_for_status()

    # Extract article IDs from links
    article_ids = re.findall(r'href="/en/articles/(\d+)', response.text)
    return list(set(article_ids))  # Remove duplicates

def fetch_article_content(article_id: str) -> dict:
    """Fetch article title and content."""
    url = f"https://glade.frontkb.com/en/articles/{article_id}"
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract title
    title_tag = soup.find('title')
    title = title_tag.text.replace(' - Glade', '').strip() if title_tag else "Unknown"

    # Extract main content
    article_body = soup.find('div', class_='fr-view') or soup.find('article')
    content = article_body.get_text(strip=True, separator='\n') if article_body else ""

    return {
        "id": article_id,
        "title": title,
        "content": content,
        "url": url
    }

def main():
    """Main scraping function."""
    all_data = {
        "legal_team": {},
        "client": {}
    }

    print("Scraping Glade.ai documentation...")
    print("=" * 60)

    # Scrape legal team categories
    print("\n## BANKRUPTCY LEGAL TEAMS")
    for category_name, category_id in CATEGORIES.items():
        print(f"\n### {category_name}")
        try:
            article_ids = fetch_category_articles(category_id)
            print(f"Found {len(article_ids)} articles")

            articles = []
            for article_id in article_ids[:3]:  # Limit to 3 per category for now
                try:
                    article = fetch_article_content(article_id)
                    articles.append(article)
                    print(f"  - {article['title']}")
                    time.sleep(0.5)  # Be nice to their server
                except Exception as e:
                    print(f"  Error fetching article {article_id}: {e}")

            all_data["legal_team"][category_name] = articles

        except Exception as e:
            print(f"Error fetching category {category_name}: {e}")

    # Scrape client categories
    print("\n## CLIENT CATEGORIES")
    for category_name, category_id in CLIENT_CATEGORIES.items():
        print(f"\n### {category_name}")
        try:
            article_ids = fetch_category_articles(category_id)
            print(f"Found {len(article_ids)} articles")

            articles = []
            for article_id in article_ids[:2]:  # Limit to 2 per category
                try:
                    article = fetch_article_content(article_id)
                    articles.append(article)
                    print(f"  - {article['title']}")
                    time.sleep(0.5)
                except Exception as e:
                    print(f"  Error fetching article {article_id}: {e}")

            all_data["client"][category_name] = articles

        except Exception as e:
            print(f"Error fetching category {category_name}: {e}")

    # Save raw data
    with open('glade-docs-raw.json', 'w') as f:
        json.dump(all_data, f, indent=2)

    print("\n" + "=" * 60)
    print("Scraping complete! Data saved to glade-docs-raw.json")

    return all_data

if __name__ == "__main__":
    main()
