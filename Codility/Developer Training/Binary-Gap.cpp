#include <bits/stdc++.h>
#include <cstdlib.h>
using namespace std;

/*  All Required define Pre-Processors and typedef Constants */
typedef long int int32;
typedef unsigned long int uint32;
typedef long long int int64;
typedef unsigned long long int  uint64;

int main(int N)
{
  string input = bitset<64>(N).to_string();
  input.erase(0, input.find_first_not_of('0'));
  bool check = false;
  int highestStreak = 0, temporaryStreak = 0;

  for(uint32 i=0; i< input.length(); i++)
  {
    if(input[i] == '1' && !check)
    {
      check = true;
    }
    else if(input[i] == '1' && check)
    {
      if(temporaryStreak > highestStreak)
        highestStreak = temporaryStreak;
       temporaryStreak = 0;
       check = false;
    }
    else if(check)
    {
      temporaryStreak++;
    }
  }
  return highestStreak;
}

