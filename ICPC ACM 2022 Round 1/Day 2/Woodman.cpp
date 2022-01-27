#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

int main()
{

	int size; 
	cin >> size;
	cin.ignore(); 
	for (int i = 0; i < size; i++)
	{
		vector<int> arr;
		string str; 
		getline(cin, str); 
		str = str.substr(1, str.size() - 2);
		stringstream ss(str);

		while (ss.good()) {
			string substr;
			getline(ss, substr, ',');
			arr.push_back(stoi(substr));
		}
		int cost = 0;
		while (arr.size() > 1)
		{
			cost += arr.front() + arr.back();
			if (arr.front() < arr.back())
			{
				arr.pop_back();
			}
			else
				arr.erase(arr.begin());
		}
		cout << cost << endl;
	}
	return 0;
}
