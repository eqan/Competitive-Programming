#include <stack>
#include <limits.h>
#include <queue>

#include <iostream>

using namespace std;

void longestRegularBracket(string inputString, int &length, int &count)
{

	int n = inputString.length();

	int closing[n + 1], opening[n + 1];

	for (int i = 0; i <= n; i++)
	{
		closing[i] = INT_MAX;
		opening[i] = INT_MAX;
	}

	stack<int> s;

	for (int i = 0; i < n; i++)
	{
		if (inputString[i] == ')')
		{
			if (!s.empty())
			{
				int top = s.top();
				s.pop();
				opening[i] = top;

				closing[i] = top;	
				   
				closing[i] = min(closing[opening[i] - 1], closing[i]);
			}
		}

		else
		{
			s.push(i);
		}
	}

	for (int i = 0; i < n; i++)
	{
		if (inputString[i] == ')')
		{
			if (i - closing[i] + 1 > length)
			{
				length = i - closing[i] + 1;
				count = 1;
			}

			else if (i - closing[i] + 1 == length)
			{
				count++;
			}
		}
	}
	
	if (length == 0)
	{
		count = 1;
	}

}
int main()
{
	queue<int> maxLengths, numberOfSubstring;
	int n;
	string input = "";
	cin >> n;
	int size;
	int count;
	for(int z=0; z< n; z++)
		{
			size = 0;count = 0;
			cin >> input;
			longestRegularBracket(input, size, count);
			maxLengths.push(size);
			numberOfSubstring.push(count);	
	}
	while(!maxLengths.empty())
	{
		cout << maxLengths.front()  << ' ' << numberOfSubstring.front() << '\n';
		maxLengths.pop();
		numberOfSubstring.pop();
	}	
}
