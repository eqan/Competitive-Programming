#include <string>
#include <iostream>
using namespace std;
bool check_anagrams(string a1, string a2)
{
    bool words[26] = { false };
    unsigned int l1=a1.length();
     unsigned int l2=a2.length();
    for (unsigned int i = 0; i < l1; i++)
    {
        if (a1[i] == ' ')
            continue; 
        words[int(a1[i]) - 97] = true;
    }
    for (unsigned int i = 0; i < l2; i++)
    {
        if (a2[i] == ' ')
            continue;
        if (words[a2[i] - 97] == false)
            return false;
    }
    return true;
}

// Driver code
int main()
{
    int size; 
    cin >> size; 
    cin.ignore();
    for (int i = 0; i < size; i++)
    {
        string a1, a2;
        getline(cin, a1);
        getline(cin, a2);

        if (check_anagrams(a1, a2))
            cout << "Possible\n";
        else
            cout << "Not Possible\n";
    }
    return 0;
}
